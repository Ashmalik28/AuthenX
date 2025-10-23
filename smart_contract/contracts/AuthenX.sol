// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuthenX {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Organization {
        string name;
        address wallet;
        bool approved;
    }

    struct Document {
        string personName;          
        address personWallet;       
        string docType;             
        string orgName;             
        address orgWallet;          
        uint256 issuedAt;           
        string docHash;             
        bool valid;                 
    }

    mapping(address => Organization) public organizations;     
    mapping(address => Document[]) private orgDocuments;       
    mapping(address => Document[]) private personDocuments;    
    address[] private orgList; 

    event OrgApproved(address indexed orgWallet, string name);
    event OrgRevoked(address indexed orgWallet);
    event DocumentIssued(address indexed personWallet, address indexed orgWallet, string docType, string docHash);
    event DocumentRevoked(address indexed personWallet, string docHash);


    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this");
        _;
    }

    modifier onlyOrg() {
        require(organizations[msg.sender].approved == true, "Only approved orgs can call this");
        _;
    }


    function approveOrg(address _orgWallet, string memory _orgName) external onlyOwner {
        organizations[_orgWallet] = Organization({
            name: _orgName,
            wallet: _orgWallet,
            approved: true
        });

        bool exists = false;
        for (uint i = 0; i < orgList.length; i++) {
            if (orgList[i] == _orgWallet) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            orgList.push(_orgWallet);
        }

        emit OrgApproved(_orgWallet, _orgName);
    }

    function revokeOrg(address _orgWallet) external onlyOwner {
        require(organizations[_orgWallet].approved == true, "Organization not approved");
        organizations[_orgWallet].approved = false;

        emit OrgRevoked(_orgWallet);
    }

    function issueDocument(
        string memory _personName,
        address _personWallet,
        string memory _docType,
        string memory _docHash
    ) external onlyOrg {
        Organization memory org = organizations[msg.sender];

        Document memory newDoc = Document({
            personName: _personName,
            personWallet: _personWallet,
            docType: _docType,
            orgName: org.name,
            orgWallet: msg.sender,
            issuedAt: block.timestamp,
            docHash: _docHash,
            valid: true
        });

        orgDocuments[msg.sender].push(newDoc);
        personDocuments[_personWallet].push(newDoc);

        emit DocumentIssued(_personWallet, msg.sender, _docType, _docHash);
    }

    function revokeDocument(address _personWallet, string memory _docHash) external onlyOrg {
        Document[] storage docs = personDocuments[_personWallet];
        for (uint i = 0; i < docs.length; i++) {
            if (
                keccak256(bytes(docs[i].docHash)) == keccak256(bytes(_docHash)) &&
                docs[i].orgWallet == msg.sender
            ) {
                docs[i].valid = false;

                Document[] storage orgDocs = orgDocuments[msg.sender];
                for (uint j = 0; j < orgDocs.length; j++) {
                    if (keccak256(bytes(orgDocs[j].docHash)) == keccak256(bytes(_docHash))) {
                        orgDocs[j].valid = false;
                        break;
                    }
                }

                emit DocumentRevoked(_personWallet, _docHash);
                break;
            }
        }
    }

    function verifyDocument(address _personWallet, string memory _docHash) external view returns (bool) {
        Document[] memory docs = personDocuments[_personWallet];
        for (uint i = 0; i < docs.length; i++) {
            if (
                keccak256(bytes(docs[i].docHash)) == keccak256(bytes(_docHash)) &&
                docs[i].valid
            ) {
                return true;
            }
        }
        return false;
    }

    function getDocumentsByOrg(address _orgWallet) external view returns (Document[] memory) {
        return orgDocuments[_orgWallet];
    }

    function getDocumentsByPerson(address _personWallet) external view returns (Document[] memory) {
        return personDocuments[_personWallet];
    }

    function getAllDocuments() external view onlyOwner returns (Document[] memory) {
        uint totalDocs = 0;

        for (uint i = 0; i < orgList.length; i++) {
            if (organizations[orgList[i]].approved) {
                totalDocs += orgDocuments[orgList[i]].length;
            }
        }

        Document[] memory allDocs = new Document[](totalDocs);
        uint index = 0;

        for (uint i = 0; i < orgList.length; i++) {
            if (organizations[orgList[i]].approved) {
                Document[] memory docs = orgDocuments[orgList[i]];
                for (uint j = 0; j < docs.length; j++) {
                    allDocs[index] = docs[j];
                    index++;
                }
            }
        }

        return allDocs;
    }
}

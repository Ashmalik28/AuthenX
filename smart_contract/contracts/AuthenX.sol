// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuthenX {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // --- STRUCTS ---
    struct Organization {
        string name;
        address wallet;
        bool approved;
    }

    struct Document {
        string personName;          // Name of the person
        address personWallet;       // Wallet address of the person
        string docType;             // e.g., Driving License, Degree, Insurance
        string orgName;             // Organization issuing the document
        address orgWallet;          // Wallet address of the organization
        uint256 issuedAt;           // Timestamp of issuance
        string docHash;             // Pinata IPFS CID (hash of the document)
        bool valid;                 // Status: valid or revoked
    }

    // --- STORAGE ---
    mapping(address => Organization) public organizations;     // orgWallet => Organization
    mapping(address => Document[]) private orgDocuments;       // orgWallet => documents they issued
    mapping(address => Document[]) private personDocuments;    // personWallet => documents they own

    // --- EVENTS ---
    event OrgApproved(address indexed orgWallet, string name);
    event OrgRevoked(address indexed orgWallet);
    event DocumentIssued(address indexed personWallet, address indexed orgWallet, string docType, string docHash);
    event DocumentRevoked(address indexed personWallet, string docHash);

    // --- MODIFIERS ---
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this");
        _;
    }

    modifier onlyOrg() {
        require(organizations[msg.sender].approved == true, "Only approved orgs can call this");
        _;
    }

    // --- ORGANIZATION MANAGEMENT ---

    function approveOrg(address _orgWallet, string memory _orgName) external onlyOwner {
        organizations[_orgWallet] = Organization({
            name: _orgName,
            wallet: _orgWallet,
            approved: true
        });

        emit OrgApproved(_orgWallet, _orgName);
    }

    function revokeOrg(address _orgWallet) external onlyOwner {
        require(organizations[_orgWallet].approved == true, "Organization not approved");
        organizations[_orgWallet].approved = false;

        emit OrgRevoked(_orgWallet);
    }

    // --- DOCUMENT MANAGEMENT ---

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

                // Also update in orgDocuments
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

    // --- VIEW FUNCTIONS ---

    function verifyDocument(address _personWallet, string memory _docHash) external view returns (bool) {
        Document[] memory docs = personDocuments[_personWallet];
        for (uint i = 0; i < docs.length; i++) {
            if (
                keccak256(bytes(docs[i].docHash)) == keccak256(bytes(_docHash)) &&
                docs[i].valid
            ) {
                return true; // Document is valid
            }
        }
        return false; // Not found or revoked
    }

    function getDocumentsByOrg(address _orgWallet) external view returns (Document[] memory) {
        return orgDocuments[_orgWallet];
    }

    function getDocumentsByPerson(address _personWallet) external view returns (Document[] memory) {
        return personDocuments[_personWallet];
    }

    function getAllDocuments(address[] memory _orgWallets) external view onlyOwner returns (Document[] memory) {
        uint totalDocs = 0;
        for (uint i = 0; i < _orgWallets.length; i++) {
            totalDocs += orgDocuments[_orgWallets[i]].length;
        }

        Document[] memory allDocs = new Document[](totalDocs);
        uint index = 0;

        for (uint i = 0; i < _orgWallets.length; i++) {
            Document[] memory docs = orgDocuments[_orgWallets[i]];
            for (uint j = 0; j < docs.length; j++) {
                allDocs[index] = docs[j];
                index++;
            }
        }

        return allDocs;
    }
}


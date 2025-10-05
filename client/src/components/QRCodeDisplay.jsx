
import {QRCodeCanvas} from "qrcode.react"

const QRCodeDisplay = ({value}) => {
    return (
        <div className="flex">
         <QRCodeCanvas value = {value || "Dummy QR Code"} size={200} />
         
        </div>
    )
}

export default QRCodeDisplay;
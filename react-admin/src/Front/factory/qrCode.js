import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
    const [url, setUrl] = useState(
        `ProductName:${"Lorem Ipsum is simply dummy text of the printing and typesetting."} ProductDescription:${"Lorem Ipsum is simply dummy text of the printing and typesetting."}
        Quantity:${"Lorem Ipsum is simply dummy text of the printing and typesetting"} 
    `);
    const qrRef = useRef();
    const downloadQRCode = (e) => {
        e.preventDefault();
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `scm-product-detal.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        //setUrl("");
    };
    const qrCodeEncoder = (e) => {
        //setUrl(e.target.value);

        const productCompleteRecord = [];

        productCompleteRecord.push(
            <><table>
                <tr>
                    <th>Batch ID</th>
                    <th>Raw Material Supplier</th>
                    <th>Warehouse</th>
                    <th>Material Type</th>
                    <th>Yarn Quantity</th>
                    <th>Yarn Color</th>
                    <th>Yarn Type</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </table></>
        )
        //setUrl(productCompleteRecord)
    };


    const qrcode = (
        <QRCodeCanvas id="qrCode" value={url} size={400} bgColor={"#ffffff"} // fgColor={"#7f0000"}
            imageSettings={{src:"https://richmint.com/full-logo-size_00dc00340_46620.png", excavate:true}}
            includeMargin
            level={"H"}
        />
    );


    // const qrcode = (
    //     <QRCodeCanvas
    //         id="qrCode"
    //         value={url}
    //         size={300}
    //         bgColor={"#ffffff"}
    //         level={"H"}
    //     />
    // );
    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h4>Check Product Authentication</h4>
                </div>
                <div className="bottom">
                    <div className="right" style={{ textAlign: "center" }}>
                        <div className="qrcode__container">
                            <div ref={qrRef}>{qrcode}</div>
                            <div className="input__group">
                                <form onSubmit={downloadQRCode}>
                                    {/* <label>Enter URL</label>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={qrCodeEncoder}
                                        placeholder="https://hackernoon.com"
                                    /> */}
                                    <button type="submit" >Download QR code</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QrCode;
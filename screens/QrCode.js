import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import {Text} from 'react-native'
 
function QrCode( navigation) {
    // const { uid } = route.params;
    // console.log("uid in QR code: ", uid)
//   const [inputText, setInputText] = useState('');
//   const [qrCodeText, setQRCodeText] = useState('');
 
//   // generate QR code
//   const generateQRCode = () => {
//     setQRCodeText(inputText);
//   }
 
//   // download QR code
//   const downloadQRCode = () => {
//     const qrCodeURL = document.getElementById('qrCodeEl')
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     console.log(qrCodeURL)
//     let aEl = document.createElement("a");
//     aEl.href = qrCodeURL;
//     aEl.download = "QR_Code.png";
//     document.body.appendChild(aEl);
//     aEl.click();
//     document.body.removeChild(aEl);
//   }
 
//   return (
//     <div >
//       <div className="qr-input">
//         <input
//           type="text"
//           placeholder="Enter input"
//           value={inputText}
//           onChange={e => setInputText(e.target.value)}
//         />
//         <input
//           type="button"
//           value="Generate"
//           onClick={generateQRCode}
//         />
//       </div>
//       <QRCode
//         id="qrCodeEl"
//         size={150}
//         value={qrCodeText}
//       />
//       <br />
//       <input
//         type="button"
//         className="download-btn"
//         value="Download"
//         onClick={downloadQRCode}
//       />
//     </div>
//   );
return <Text>QR CODE</Text>
}
 
export default QrCode;
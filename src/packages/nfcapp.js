import {store} from '../store.js'

export default function (Vue){
    let vm = this
    let compatibleDevices = [
        {
            deviceName: 'ACR122U USB NFC Reader',
            productId: 0x2200,
            vendorId: 0x072f,
            thumbnailURL: ''
        }
    ]

    let device = null
    let tag_detected = false
    let tag_checker = null
    let long_tag_checker = null
    let tag_id = null

    let VueNFC = {
        readNdefTag() {
            let tag_info = null
            chrome.nfc.read(device, {}, function (type, ndef) {

                if (typeof ndef.ndef !== 'undefined') {
                    var ndef_len = ndef.ndef.length
                    for (var i = 0; i < ndef_len; i++) {
                        tag_info = ndef.ndef[i]
                        tag_id = tag_info.tag_id
                        if (tag_info.new_card) {
                            store.state.card_info = {
                                user_id: '',
                                card_id: tag_id,
                                points: 0,
                                last_date_updated: '',
                                store_id: ''
                            }
                        } else {
                            var info = tag_info.text.split(";")
                            store.state.card_info = {
                                user_id: info[0],
                                card_id: tag_id,
                                points: info[1],
                                last_date_updated: info[2],
                                store_id: info[3]
                            }
                        }
                    }
                    tag_detected = true;
                } else {
                    VueNFC.resetCardInfo()
                }
                VueNFC.checkTagDetected()
            });
        },

        writeNdefTag(ndefType, ndefValue) {
            var ndef = {};
            ndef[ndefType] = ndefValue;
            chrome.nfc.write(device, {"ndef": [ndef]}, function (rc) {
                if (!rc) {
                    console.log('NFC Tag written!')
                    var info = ndefValue.split(";")
                    store.state.card_info = {
                        user_id: info[0],
                        card_id: tag_id,
                        points: info[1],
                        last_date_updated: info[2],
                        store_id: info[3]
                    }
                    console.log(ndef)
                    console.log(info)
                    clearInterval(tag_checker);
                    clearInterval(long_tag_checker);
                    VueNFC.readNdefTag()
                } else {
                    console.log('NFC Tag write operation failed', rc)
                }
            });
        },

        showDeviceInfo () {
            var deviceInfo = null;
            for (var i = 0; i < compatibleDevices.length; i++) {
                if (device.productId === compatibleDevices[i].productId &&
                    device.vendorId === compatibleDevices[i].vendorId) {
                    deviceInfo = compatibleDevices[i];
                }
            }

            if (!deviceInfo)
                return;

            store.state.device_info = {
                device_name: deviceInfo.deviceName,
                vendor_id: deviceInfo.vendorId,
                product_id: deviceInfo.productId,
            }
        },

        enumerateDevices () {
            chrome.nfc.findDevices(function (devices) {
                device = devices[0];
                VueNFC.showDeviceInfo()
            });
        },

        runTagChecker () {
            setTimeout(function(){ 
                VueNFC.readNdefTag(); 
            }, 500);
        },

        runLongTagChecker() {
            long_tag_checker = setInterval(function () {
                VueNFC.readNdefTag()
            }, 1000);
        },

        checkTagDetected () {
            clearInterval(tag_checker);
            clearInterval(long_tag_checker);
            VueNFC.runLongTagChecker()
        },

        resetCardInfo () {
            store.state.card_info = {
                user_id: '',
                card_id: '',
                points: 0,
                last_date_updated: '',
                store_id: ''
            }
        },

        destroyCheck() {
            VueNFC.resetCardInfo()
            clearInterval(tag_checker)
            clearInterval(long_tag_checker)
        }

    }

    Object.defineProperties(Vue.prototype, {
        $nfc: {
            get () {
                return VueNFC
            }
        }
    })
}
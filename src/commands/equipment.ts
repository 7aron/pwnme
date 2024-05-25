const createEquipment = (): string[] => {
    const equipment: string[] = [];
    const SPACE = "&nbsp;";
  
    const EQUIPMENT = [
      { name: "Rubber Ducky", description: "Keystroke injection tool" },
      { name: "Flipper Zero", description: "Portable multi-tool for pentesters" },
      { name: "Hak5 Pineapple", description: "Wireless network auditing tool" },
      { name: "Proxmark3", description: "RFID and NFC analysis tool" },
      { name: "HackRF One", description: "Hardware platform for SDR" },
      { name: "Bash Bunny", description: "Multi-function USB attack tool" },
      { name: "LAN Turtle", description: "Covert pentesting tool and backdoor" },
      { name: "USB Killer", description: "High-voltage USB attack device" },
      { name: "Raspberry Pi", description: "Small, versatile computer" },
      { name: "ChameleonMini", description: "RFID skeleton key" },
      { name: "Ubertooth One", description: "Bluetooth sniffing tool" },
      { name: "Deauther Watch", description: "Wearable for network deauth" },

    ];
  
    equipment.push("<br>");
    equipment.push("Don't buy these if you don't know how to use them:");
    equipment.push("<br>");
  
    EQUIPMENT.forEach(item => {
      let string = '';
      string += `<div style="display: flex; align-items: center;">`;
      string += SPACE.repeat(2);
      string += `<strong style="color: #20C20E; width: 150px; display: inline-block;">${item.name}</strong>`;
      string += ` ${item.description}`;
      string += `</div>`;
      equipment.push(string);
    });
  
    equipment.push("<br>");
    equipment.push(`${EQUIPMENT.length} Gadget(s)`);
    equipment.push("<br>");
    return equipment;
  }
  
  export const EQUIPMENT = createEquipment();
  
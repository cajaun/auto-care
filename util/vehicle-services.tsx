export const vehicleServices = [
  {
    name: "Repair Service",
    image: require("@/assets/images/services/repair.png"),
    tag: require("@/assets/images/services/repair-service-tag.png"),
    category: "Services",
  },

  {
    name: "Flat Tire Service",
    image: require("@/assets/images/services/flat-tire.png"),
    tag: require("@/assets/images/services/flat-tire-service-tag.png"),
    category: "Services",
  },
  {
    name: "Flat Battery Service",
    image: require("@/assets/images/services/flat-battery-service.png"),
    tag: require("@/assets/images/services/flat-battery-service-tag.png"),
    category: "Services",
  },

  {
    name: "Car Wash Service",
    image: require("@/assets/images/services/wash-service.png"),
    tag: require("@/assets/images/services/wash-service-tag.png"),
    category: "Services",
  },
  {
    name: "Recovery Service",
    image: require("@/assets/images/services/recovery-service.png"),
    tag: require("@/assets/images/services/recovery-service-tag.png"),
    category: "Services",
  },
  {
    name: "Oil Change Service",
    image: require("@/assets/images/services/oil-change-service.png"),
    tag: require("@/assets/images/services/oil-change-tag.png"),
    category: "Services",
  },
];

// convert the service name to the Sf Symbol in the history listings
export const getSymbolForService = (serviceName: string): string => {
  if (/^Car-\d+$/.test(serviceName)) {
    return "car.2.fill";
  }

  switch (serviceName) {
    case "Repair Service":
      return "wrench.and.screwdriver";
    case "Flat Tire Service":
      return "tire";
    case "Flat Battery Service":
      return "minus.plus.batteryblock.fill";
    case "Car Wash Service":
      return "drop.fill";
    case "Recovery Service":
      return "car.2.fill";
    case "Oil Change Service":
      return "oilcan.and.thermometer.fill";
    case "Piston ring":
      return "engine.combustion.fill";
    case "Car Kia Motors":
      return "car.rear.waves.up";
    case "Brake Pad":
      return "pedal.brake.fill";
    case "Oil Filters":
      return "fuelpump.and.filter";
      
    default:
      return "questionmark.circle";
  }
};

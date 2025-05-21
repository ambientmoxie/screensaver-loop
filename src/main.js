import "./style.scss";
import Disk from "./disk";
import { gsap } from "gsap";

const disks = []; // Array of disk (ellipses containing strokes)
const amount = 20; // Number of desired disks
const baseRadius = 30; // Width of the first disk. Will increase using "step"
const step = 100; // 

// Generates the appropriate number of strokes for each disk.
// For graphical purposes, the farther from the center, the more strokes.
// It’s also important to sometimes keep a similar number of strokes between neighboring disks.
function getStrokeAmount(index) {
  if (index < 1) return 4;
  if (index < 2) return 8;
  if (index < 3) return 16;
  if (index < 6) return 32;
  if (index < 10) return 64;
  if (index < 18) return 128;
  return 256;
}

let animatedIndex = 0; // counts how many animated disks we’ve done

// Creates the full set of disks based on the "amount" variable.
// Note: avoid going much higher than 20 — browsers may struggle to render too many animated disks.
for (let index = 0; index < amount; index++) {
  const radius = baseRadius + step * index;
  const strokeAmount = getStrokeAmount(index);

  // Create the disk.
  const disk = new Disk({ radius, index, strokeAmount }).createDisk();

  // Attach GSAP animation to it.
  // Only uneven-indexed disks are animated, alternating between clockwise
  // and counterclockwise rotation.
  if (index % 2 !== 0) {
    const angle = animatedIndex % 2 === 0 ? 45 : -45;

    gsap.timeline({ delay: 2, repeat: -1, repeatDelay: 2 }).to(disk, {
      rotate: `+=${angle}`,
      duration: 2,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
    });

    animatedIndex++;
  }

  // Add it to the disk collection
  disk.style.zIndex = amount - index;
  disks.push(disk);
}

// Get the disk container and inject all disks into it.
const wrapper = document.querySelector("#wrapper");
wrapper.append(...disks);

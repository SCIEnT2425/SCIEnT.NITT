/**
 * seedBpclTools.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Idempotent sync of the BPCL-sponsored tools (poweredBy: "BPCL"):
 *   - inserts any tool whose name is not in the DB yet
 *   - replaces the old stock placeholder photo of an existing BPCL tool with
 *     its real photo; an image uploaded through the admin is left alone
 *
 * Photos ship with the frontend in public/assets/inventory/bpcl/ (credits:
 * public/assets/inventory/bpcl/credits.html), so imageUrl is a site path.
 *
 * Usage (from repo root):
 *   cd server && node scripts/seedBpclTools.js
 * Also run by POST /api/inventory/seed-bpcl (routes/bpclSeedRoutes.js).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const Tool = require('../models/Tool');

// ── BPCL Tool definitions ────────────────────────────────────────────────────
// Each entry: name, category, description, quantity, imageUrl (site path of its photo)
const BPCL_TOOLS = [
  // ── i. Machines - CAPEX ──────────────────────────────────────────────────
  {
    name: 'CNC Lathe',
    category: 'BPCL Sponsored',
    description: 'Precision computer-controlled lathe for turning, facing, and threading metal workpieces with high accuracy. Cost: Rs.8,85,000.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/cnc-lathe.jpg',
  },
  {
    name: 'CNC Laser Cutter',
    category: 'BPCL Sponsored',
    description: 'High-power CNC laser cutter for precision cutting and engraving of metals, acrylic, wood, and composites. Cost: Rs.7,67,000.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/cnc-laser-cutter.jpg',
  },
  {
    name: 'Vertical Drilling Machine',
    category: 'BPCL Sponsored',
    description: 'Industrial vertical drill press for accurate hole drilling in metal, wood, and plastic with variable speed control. Cost: Rs.59,157.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/vertical-drilling-machine.jpg',
  },
  {
    name: 'Spot Welding Machine',
    category: 'BPCL Sponsored',
    description: 'Resistance spot welder for joining sheet metal components quickly and cleanly without filler material. Cost: Rs.44,999.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/spot-welding-machine.jpg',
  },
  {
    name: 'Sheet Metal Bender',
    category: 'BPCL Sponsored',
    description: 'Precision sheet metal bending machine (press brake) for forming accurate angles and channels in metal sheets. Cost: Rs.35,999.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/sheet-metal-bender.jpg',
  },
  {
    name: 'Bambu Lab X1 Carbon Combo 3D Printer',
    category: 'BPCL Sponsored',
    description: 'Professional multi-material 3D printer with carbon-fibre reinforced frame, 16-colour support, and 20,000 mm/s2 acceleration for ultra-fast prototyping. Cost: Rs.1,82,000.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/bambu-x1-carbon.jpg',
  },
  {
    name: '3D Scanner',
    category: 'BPCL Sponsored',
    description: 'High-resolution 3D scanner for reverse engineering, quality inspection, and digitising physical objects into CAD models. Cost: Rs.1,88,800.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/3d-scanner.jpg',
  },
  {
    name: 'Pipe Bending Machine',
    category: 'BPCL Sponsored',
    description: 'Hydraulic pipe bending machine for forming precise bends in metal tubing for structural and fluid-system applications. Cost: Rs.75,000.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/pipe-bending-machine.jpg',
  },
  {
    name: 'Chop Saw - Boschcut Off Machine 14 inch',
    category: 'BPCL Sponsored',
    description: '14-inch abrasive chop saw for rapid, clean cross-cuts through steel bars, pipes, and profiles. Cost: Rs.14,804 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/chop-saw.jpg',
  },

  // ── ii. High-Speed Processors - CAPEX ───────────────────────────────────
  {
    name: 'Jetson Nano Orin',
    category: 'BPCL Sponsored',
    description: 'NVIDIA Jetson Orin Nano - edge AI module with 1024-core Ampere GPU for real-time vision, robotics, and autonomous systems. Cost: Rs.53,231.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/jetson-orin-nano.jpg',
  },
  {
    name: 'Intel RealSense Depth Camera',
    category: 'BPCL Sponsored',
    description: 'Intel RealSense D-series depth camera for 3D perception, obstacle avoidance, and SLAM in robotics applications. Cost: Rs.31,999 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/intel-realsense.jpg',
  },
  {
    name: 'NVIDIA GeForce RTX 3090',
    category: 'BPCL Sponsored',
    description: '24 GB VRAM flagship GPU for deep learning model training, simulation rendering, and GPU-accelerated compute. Cost: Rs.2,07,999 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/rtx-3090.jpg',
  },
  {
    name: 'AMD Ryzen 5600x Processor',
    category: 'BPCL Sponsored',
    description: '6-core, 12-thread Zen 3 desktop processor for high-performance simulation workstations and embedded compute nodes. Cost: Rs.14,890 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/ryzen-5600x.jpg',
  },
  {
    name: 'BeagleBone Black Development Board',
    category: 'BPCL Sponsored',
    description: 'Open-source single-board computer with dual-core PRU subsystem for real-time I/O control in robotics and automation projects. Cost: Rs.5,899 each.',
    quantity: 4,
    imageUrl: '/assets/inventory/bpcl/beaglebone-black.jpg',
  },
  {
    name: 'Artix FPGA BASYS3 for Vivado',
    category: 'BPCL Sponsored',
    description: 'Xilinx Artix-7 FPGA development board for digital design, HDL prototyping, and custom hardware acceleration experiments. Cost: Rs.17,999.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/basys3.jpg',
  },
  {
    name: 'Precision 3260 Compact Workstation',
    category: 'BPCL Sponsored',
    description: 'Dell Precision 3260 mini-workstation for CAD, simulation, and engineering compute tasks in a compact form factor. Cost: Rs.99,370 each.',
    quantity: 5,
    imageUrl: '/assets/inventory/bpcl/dell-precision-3260.jpg',
  },

  // ── iii. Equipment - CAPEX ───────────────────────────────────────────────
  {
    name: 'DJI Mini 3 Pro Drone',
    category: 'BPCL Sponsored',
    description: 'DJI Mini 3 Pro with Fly More Kit - sub-250g drone featuring 4K/60fps camera, obstacle sensing, and extended-range controller for aerial surveys. Cost: Rs.1,06,374 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/dji-mini-3-pro.jpg',
  },
  {
    name: 'Hot Air Blower Gun',
    category: 'BPCL Sponsored',
    description: 'Industrial hot air blower (heat gun) for SMD rework, heat-shrink tubing, and plastic forming in electronics assembly. Cost: Rs.21,500 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/hot-air-gun.jpg',
  },
  {
    name: 'Vacuum Pump',
    category: 'BPCL Sponsored',
    description: 'High-vacuum rotary vane pump for laboratory vacuum systems, composite layup bagging, and vacuum-assisted resin infusion. Cost: Rs.3,400 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/vacuum-pump.jpg',
  },
  {
    name: 'Oscilloscope - RIGOL DS1054Z',
    category: 'BPCL Sponsored',
    description: 'RIGOL DS1054Z 4-channel, 50 MHz digital oscilloscope with 1 GSa/s sample rate for electronics debugging and signal analysis. Cost: Rs.39,990 each.',
    quantity: 2,
    imageUrl: '/assets/inventory/bpcl/rigol-ds1054z.jpg',
  },
  {
    name: 'Swarm Robotics System',
    category: 'BPCL Sponsored',
    description: 'Complete swarm robotics platform including multiple drones, ground control station, and flight controller software for autonomous multi-agent research. Cost: Rs.6,50,000.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/swarm-robotics.jpg',
  },
  {
    name: 'Adjustable Power Supply',
    category: 'BPCL Sponsored',
    description: 'Bench DC power supply with adjustable voltage and dual current ranges (>5A and <5A) for powering and testing electronic circuits. Cost: Rs.34,987.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/power-supply.jpg',
  },

  // ── Sub-Project 2: TechClubs - Select Lab Instruments ───────────────────
  {
    name: 'Homogenizer',
    category: 'BPCL Sponsored',
    description: 'Laboratory homogenizer for mixing, emulsifying, and dispersing biological and chemical samples in biodegradable films and coatings research. Cost: Rs.1,94,051.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/homogenizer.jpg',
  },
  {
    name: 'Refractometer',
    category: 'BPCL Sponsored',
    description: 'Precision optical refractometer for measuring the refractive index of liquids and thin films in materials characterisation experiments. Cost: Rs.11,42,040.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/refractometer.jpg',
  },
  {
    name: 'Humidity Chamber',
    category: 'BPCL Sponsored',
    description: 'Programmable environmental test chamber for controlled humidity and temperature testing of materials and electronic assemblies. Cost: Rs.3,19,780.',
    quantity: 1,
    imageUrl: '/assets/inventory/bpcl/humidity-chamber.jpg',
  },
];

// The stock placeholder photos the first seed used: Unsplash links, and the
// copies of them uploaded to Cloudinary's Inventory_BPCL folder
const isPlaceholderImage = (image = {}) =>
  !image.url ||
  image.url.includes('images.unsplash.com') ||
  (image.filename || '').startsWith('Inventory_BPCL/');

// Inserts missing BPCL tools and swaps placeholder photos for the real ones.
// Returns { inserted, updated, unchanged, details }.
async function syncBpclTools() {
  const results = { inserted: 0, updated: 0, unchanged: 0, details: [] };

  for (const { imageUrl, ...tool } of BPCL_TOOLS) {
    const image = { url: imageUrl, filename: '' };
    // Match on poweredBy too: a regular tool can share a BPCL tool's name
    // (both have a "Vertical Drilling Machine")
    const existing = await Tool.findOne({ name: tool.name, poweredBy: 'BPCL' });

    if (!existing) {
      await Tool.create({ ...tool, image, poweredBy: 'BPCL' });
      results.inserted++;
      results.details.push({ name: tool.name, status: 'inserted' });
    } else if (existing.image?.url !== imageUrl && isPlaceholderImage(existing.image)) {
      existing.image = image;
      await existing.save();
      results.updated++;
      results.details.push({ name: tool.name, status: 'photo updated' });
    } else {
      results.unchanged++;
      results.details.push({ name: tool.name, status: 'unchanged' });
    }
  }
  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Connecting to MongoDB...');
  // Same precedence as config/db.js
  await mongoose.connect(process.env.MONGO_URI_ATLAS || process.env.MONGO_URI);
  console.log('Connected.\n');

  const { inserted, updated, unchanged, details } = await syncBpclTools();
  details.forEach(d => console.log(`${d.status.padEnd(14)} ${d.name}`));

  console.log('-----------------------------------------');
  console.log(`Inserted      : ${inserted}`);
  console.log(`Photo updated : ${updated}`);
  console.log(`Unchanged     : ${unchanged}`);
  console.log('-----------------------------------------');

  await mongoose.disconnect();
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { BPCL_TOOLS, syncBpclTools };

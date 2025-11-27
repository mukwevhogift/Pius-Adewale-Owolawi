const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'img');

// Create placeholder mappings using existing images
const placeholders = {
    'prof-owolawi.jpg': '1.jpg',
    'prof-owolawi-2.jpg': '2.jpg',
    'lab-4ir.jpg': '3.jpg',
    'lab-drone.jpg': '4.jpg',
    'lab-ai.jpg': '5.jpg',
    'conference-1.jpg': 'internation.jpg',
    'research-team.jpg': 'dr-altaf-samo.jpg',
    'award-ceremony.jpg': 'IMG-20250411-WA0001.jpg'
};

console.log('Creating image placeholders...\n');

Object.entries(placeholders).forEach(([target, source]) => {
    const sourcePath = path.join(imgDir, source);
    const targetPath = path.join(imgDir, target);

    if (fs.existsSync(sourcePath)) {
        if (!fs.existsSync(targetPath)) {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`✓ Created ${target} from ${source}`);
        } else {
            console.log(`- ${target} already exists`);
        }
    } else {
        console.log(`✗ Source ${source} not found`);
    }
});

console.log('\n✓ Image setup complete!');
console.log('\nNote: Replace these placeholder images with actual photos of:');
console.log('  - Prof. Owolawi (professional portraits)');
console.log('  - Laboratory facilities');
console.log('  - Conference and award ceremonies');
console.log('  - Research team photos\n');

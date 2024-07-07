import fs from 'node:fs';
import path from 'node:path';

const ANIMAL_SOUNDS = fs.readdirSync(path.join('../../public/sounds'))
    .map(file => path.basename(file, path.extname(file)));

fs.writeFileSync('../assets/data/animal_sounds.json', JSON.stringify(ANIMAL_SOUNDS), err => {
    if(err) {
        console.log(err);
    } else {
        console.log("File created successfully");
    }
});
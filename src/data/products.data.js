import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readJSONFile = async () => {
    try {
        const filePath = path.join(__dirname, '../data/products.json');
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
};

const writeJSONFile = async (data) => {
    try {
        const filePath = path.join(__dirname, '../data/products.json');
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw error;
    }
};

export const productsData = {
    readJSONFile,
    writeJSONFile,
};

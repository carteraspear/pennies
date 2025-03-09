import { useState } from 'react';
import './App.css';

// Define types for the items
interface BudgetItem {
  name: string;
  price: number;
}

function App() {
  // State for the uploaded receipt image
  const [image, setImage] = useState<string | null>(null); // Image URL can be a string or null
  // State for parsed receipt data
  const [items, setItems] = useState<BudgetItem[]>([]); // Items array will hold BudgetItem objects
  // State for total budget
  const [budget, setBudget] = useState<number>(0); // Budget is a number

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Check if files exist
    if (file) {
      setImage(URL.createObjectURL(file)); // Store image preview URL
      // Here you'd send the image to an OCR API for parsing
      parseReceipt(file); // Simulated OCR parsing
    }
  };

  // Simulate parsing receipt with an OCR API
  const parseReceipt = (file: File) => {
    // In reality, you'd call an OCR API (like Tesseract.js or Google Cloud Vision)
    const parsedItems: BudgetItem[] = [
      { name: 'Item 1', price: 12.99 },
      { name: 'Item 2', price: 5.49 },
    ];

    // Add parsed items to the budget
    const newTotal = parsedItems.reduce((sum, item) => sum + item.price, 0);
    setBudget((prevBudget) => prevBudget + newTotal);
    setItems(parsedItems);
  };

  // Handle adding an item manually
  const handleAddItem = (name: string, price: number) => {
    const newItem: BudgetItem = { name, price };
    setItems([...items, newItem]);
    setBudget(budget + price);
  };

  return (
    <div className="App">
      <h1>Budgeting App</h1>
      
      <div>
        <h2>Upload a Receipt</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {image && <img src={image} alt="Receipt Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </div>

      <div>
        <h2>Budget Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name}: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total Budget: ${budget.toFixed(2)}</p>
      </div>

      <div>
        <h2>Add Item Manually</h2>
        <input
          type="text"
          placeholder="Item name"
          id="item-name"
        />
        <input
          type="number"
          placeholder="Price"
          id="item-price"
        />
        <button
          onClick={() => {
            const name = (document.getElementById('item-name') as HTMLInputElement)?.value || ''; // Type cast to HTMLInputElement
            const price = parseFloat((document.getElementById('item-price') as HTMLInputElement)?.value || '0');
            if (name && !isNaN(price)) {
              handleAddItem(name, price);
            }
          }}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default App;

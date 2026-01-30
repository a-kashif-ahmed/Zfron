import { useState } from "react";
import {subcategoryMap} from './SubCategoryMap'

function AddInventory() {
    const [category, setCategory] = useState("Men");
    const [subcate, setSubcate] = useState("");
    const cltsize = ['XS', 'S', 'M', 'L', 'XL', 'XXL','no size'] // default value to prevent null
    const [isDeal, setIsDeal] = useState(false);
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescripton] = useState("");
    const [colors, setColors] = useState("");
    const [clothsize, setClothSize] = useState([]);
    const BackendURL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const colorArr = colors.split(',').map(c=>c.trim()).filter(c=>c.length>0);
        
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subcategory",subcate);
        formData.append("isDeal", isDeal);
        formData.append('description',description);
        formData.append('colors', JSON.stringify(colorArr));
         
        for (let i = 0; i < images.length; i++) {
            formData.append("productImages", images[i]);
        }
        for (let i = 0; i < clothsize.length; i++) {
         formData.append('sizes',clothsize[i]);
        }

        try {
            const response = await fetch(`${BackendURL}/items/add`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setStatus("Product added successfully!");
                console.log("Success:", data);
            } else {
                const err = await response.json();
                setStatus("Failed to add product.");
                console.error("Error:", err);
            }
        } catch (error) {
            console.error("Network error:", error);
            setStatus("Something went wrong.");
        }
    };

    return (
        <div className=" m-1 max-w-1/4  "  >
            <form className=" " onSubmit={handleSubmit} encType="multipart/form-data" >
                <table className="m-5 p-10" >
                    <tbody>
                        <tr>
                            <td>Name of Product:</td>
                            <td>
                                <input
                                    className="m-2 p-2 border-b-1 border-blue-400"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <select className="p-1 m-1 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Men">Mens wear</option>
                                    <option value="Women">Womens wear</option>
                                    <option value="Kids">Kids wear</option>
                                    <option value="Watches">Watches</option>
                                </select>
                            </td>
                        </tr>
                        <tr><br/></tr>
                        <tr>
                            <td>Sub Category</td>
                            <td><select className="p-1 m-1 rounded-md" value={subcate} onChange={(e)=> setSubcate(e.target.value)}>
                                {(subcategoryMap[category]|| []).map((itm)=>(
                                    <option key={itm} value={itm}>{itm}</option>
                                ))}
                                </select></td>
                        </tr>
                        <tr><br/></tr>
                        <tr>
                            <td>Description:</td>
                            <td><input className="m-2 p-2 border-b-1 border-blue-400" type="text" name="description" onChange={(e)=>setDescripton(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Item Size:</td>
                            <td>{cltsize.map((size) => (<label><input className="m-2" type="checkbox" value={size} onChange={(e) => { const val = e.target.value
                                if(e.target.checked) {
                                    setClothSize(prev =>[...prev, val]);
                                }else{
                                    setClothSize(prev=>prev.filter(s=>s!==val));
                                }
                             }}/>{size}</label>))}</td>
                        </tr>
                        <tr>
                            <td>Item Colours:</td>
                            <td>
                                <input className="m-2 p-2 border-b-1 border-blue-400" type="text" onChange={(e)=>setColors(e.target.value)} name="itemcolors" /><br /><span>Please use , to separate colors name</span>

                            </td>
                        </tr>
                        <tr>
                            <td>Price of Product:</td>
                            <td>
                                <input
                                    className="m-2 p-2 border-b-1 border-blue-400"
                                    name="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Add to Deals</td>
                            <td>
                                <input
                                
                                    type="checkbox"
                                    name="isDeal"
                                    checked={isDeal}
                                    onChange={(e) => setIsDeal(e.target.checked)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Select Images:</td>
                            <td>
                                <input
                                    type="file"
                                    multiple
                                    name="productImages"
                                    onChange={(e) => setImages(e.target.files)}
                                    accept="image/*"
                                    style={{ width: "70%" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {status && <p className="mt-4 text-sm text-blue-600">{status}</p>}
        </div>
    );
}

export default AddInventory;

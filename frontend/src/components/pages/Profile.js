import myData from "./customers-large-backend.json";
import { InputText } from 'primereact/inputtext';

export const Profile = () => {
    console.log (myData)

    const currentUser = myData[0];
    console.log (currentUser);

    return (
    <div style={{
        borderStyle: "solid"
    }}>
            <br/>
            <div>
            <label>Username</label> &emsp;
            <InputText value={currentUser.base_user.user.username} disabled={true} type="text" placeholder="Username" id="username" />
            </div>
            <br/>
            <div>
            <label>Email</label> &emsp;
            <InputText value={currentUser.base_user.user.email} disabled={true} type="text" placeholder="Email" id="username" />
            </div>
            <br/>
            <div>
            <label>FirstName</label> &emsp;
            <InputText value={currentUser.base_user.user.first_name} disabled={true} type="text" placeholder="FirstName" id="username" />
            </div>
            <br/>
            <div>
            <label>LastName</label> &emsp;
            <InputText value={currentUser.base_user.user.last_name} disabled={true} type="text" placeholder="LastName" id="username" />
            </div>
            <br/>
            <div>
            <label>PhoneNumber</label> &emsp;
            <InputText value={currentUser.base_user.phone_number} disabled={true} type="text" placeholder="PhoneNumber" id="username" />
            </div>


    </div>


    

    )



}









// // import React from 'react';
// // import { OrderList } from 'primereact/orderlist';

// // import myData from "./customers-large-backend.json";

// import React, { useState, useEffect } from 'react';
// import { OrderList } from 'primereact/orderlist';
// import { ProductService } from './ProductService';
// import './OrderListDemo.css';

// export const Profile = () => {

// // export const OrderListDemo = () => {
//         const [products, setProducts] = useState([]);
//         const productService = new ProductService();

//         useEffect(() => {
//             productService.getProductsSmall().then(data => setProducts(data));
//         }, []); // eslint-disable-line react-hooks/exhaustive-deps


//         const itemTemplate = (item) => {
//             return (
//                 <div className="product-item">
//                     <div className="image-container">
//                         <img src={`images/product/${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
//                     </div>
//                     <div className="product-list-detail">
//                         <h5 className="mb-2">{item.name}</h5>
//                         <i className="pi pi-tag product-category-icon"></i>
//                         <span className="product-category">{item.category}</span>

//                         <div><p>55555555555</p></div>
//                     </div>
//                     <div className="product-list-action">
//                         <h6 className="mb-2">${item.price}</h6>
//                         <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
//                         <div><p>66666666</p></div>
//                     </div>
//                 </div>
                
//             );
//         }

//         return (

//             <div className="orderlist-demo">
//                 <div><p>111111111111</p></div>
//                 <div className="card">
//                     <OrderList value={products} header="List of Products" dragdrop listStyle={{height:'auto'}} dataKey="id"
//                         itemTemplate={itemTemplate} onChange={(e) => setProducts(e.value)}>
//                             <div><p>2222222222</p></div>
//                         </OrderList>
//                         <div><p>3333333333333</p></div>
//                 </div>
//                 <div><p>4444444444</p></div>
//             </div>
//         );
//     // }
                 
// }



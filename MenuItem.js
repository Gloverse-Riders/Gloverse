export default function MenuItem(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <img src="/caesar.png" alt="" />
            <h4 className="font-ssemibold text-xl my-2">Caesar salad</h4>
            <p className="text-gray-500 text-sm">chopped romaine lettuce and garlicky croutons, tossed in a creamy dressing made with eggs, olive oil, lemon, Parmesan, Worcestershire sauce, and anchovies.</p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add to cart</button>
        </div>
    );
}
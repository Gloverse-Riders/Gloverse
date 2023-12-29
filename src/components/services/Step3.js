
export default function Step3(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="rounded-full overflow-hidden mx-auto w-32 h-32">
                <img src="/quality-food.jpeg" alt="" className="w-full h-full object-cover " />
            </div>
            <h4 className="font-semibold text-xl my-2 text-green-900 pt-7"><strong>Quality Food</strong></h4>
            <p className="text-gray-500 text-sm">Exceptional taste, using the finest ingredients.</p>

        </div>
    );
}
import Image from 'next/image';
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
export default function HomeMenu(){
    return(
        <section className="">
            <div className="absolute left-0 right-0 w-full" >
                <div className="h-48 w-48 absolute -top-28 -left-12 -z-10">
                    <Image src={'/salad1.png'} layout={'fill'} objectFit={'contain'} alt={''} />
                </div>
                <div className="h-48 w-48 absolute -top-28 -right-12 -z10">
                    <Image src={'/salad2.png'} layout={'fill'} objectFit={'contain'} alt={''} />
                </div>
            </div>
            <div className="text-center mb-4 ">
                <SectionHeaders subHeader={'Check out'} mainHeader={'Menu'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}
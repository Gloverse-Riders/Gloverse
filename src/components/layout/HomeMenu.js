import Image from 'next/image';
import MenuItem from "src/components/menu/MenuItem";
import SectionHeaders from "src/components/layout/SectionHeaders";
import Step1 from '../services/Step1';
import Step2 from '../services/Step2';
import Step3 from '../services/Step3';
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
            <div className="text-center mb-4" id="services">
                <SectionHeaders mainHeader={'Services'} />
            </div>
            <div className="grid grid-cols-3 gap-4" >
                {/* <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem /> */}
                <Step1 />
                <Step2 />
                <Step3 />
            </div>
        </section>
    );
}
import Link from "next/link";
import Image from "next/image";

const services = ["Website Development", "Mobile App Development", "Custom Software", "AI Automation"];
const products = ["MyBooking POS", "Hotel PMS", "Gym Manager", "Clinic Manager"];

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="MyBooking" width={36} height={36} />
          <h3 className="font-display text-lg font-semibold">MyBooking Technologies Private Limited</h3>
          <p className="mt-3 text-sm text-slate-400">
            Smart Software and digital solutions for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Products</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {products.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Newsletter</h4>
          <p className="mt-3 text-sm text-slate-400">Monthly product and industry insights.</p>
          <form className="mt-4 flex gap-2" action="#">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
            <button className="rounded-xl bg-secondary-500 px-4 py-2 text-sm font-semibold text-white">Join</button>
          </form>
          <div className="mt-4 flex gap-3 text-sm text-slate-400">
            <Link href="#">LinkedIn</Link>
            <Link href="#">X</Link>
            <Link href="#">GitHub</Link>
            {whatsappNumber ? (
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} MyBooking Technologies Private Limited. All rights reserved.
      </div>
    </footer>
  );
}
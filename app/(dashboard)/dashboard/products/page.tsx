import { productCatalog } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Product Catalog</h1>
          <p className="text-slate-500 text-sm">Configure your SaaS products and feature sets.</p>
        </div>
        <Button className="w-fit">Add New Product</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productCatalog.map((product) => (
          <Card key={product.slug} className="flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
                <span className="rounded-lg bg-primary-50 px-2 py-1 text-[10px] font-bold text-primary-600 uppercase">Active</span>
              </div>
              <p className="mb-6 text-sm text-slate-500 leading-relaxed">{product.summary}</p>
              
              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Modules</p>
                <div className="flex flex-wrap gap-2">
                  {product.keyModules.slice(0, 3).map(module => (
                    <span key={module} className="text-xs text-slate-600 bg-white border border-slate-100 px-2 py-1 rounded-md">
                      {module}
                    </span>
                  ))}
                  {product.keyModules.length > 3 && (
                    <span className="text-xs text-slate-400 px-1">+{product.keyModules.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 border-t border-slate-50 pt-4">
              <Button variant="secondary" className="flex-1 text-xs py-2">Edit Details</Button>
              <Button variant="ghost" className="flex-1 text-xs py-2">Catalog View</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold mb-4">Sayfa bulunamadı</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Aradığın adres mevcut değil ya da taşınmış olabilir.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg font-semibold border-2 backdrop-blur-xl cursor-pointer"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  )
}

import Alert from 'components/Blog/alert'
import Footer from 'components/Blog/footer'
import Meta from 'components/Blog/meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

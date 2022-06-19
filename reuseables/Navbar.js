import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <Link href="/users">
        <a
          className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
          title="Home"
        >
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="dib w2 h2 br-100"
            alt="Site Name"
          />
        </a>
      </Link>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
        <Link href="/users">
          <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Users">
            Users
          </a>
        </Link>
        <Link href="/news">
          <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="news">
            News
          </a>
        </Link>
        <Link href="">
          <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="news">
            Logout
          </a>
        </Link>
      </div>
    </nav>
  );
}

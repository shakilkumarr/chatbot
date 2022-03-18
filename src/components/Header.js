import Image from 'next/image';

const Header = ({ user, isAdmin }) => (
  <div className="head">
    <Image src="/clgLogo.png" width={150} height={50} />
    <div>Tech Giants Chat Bot</div>
    <div className="userInfo">
      <div>Welcome {user?.displayName || user?.email || 'Guest'}!</div>
      {isAdmin && <div className="adminText">(You are logged in as an Admin)</div>}
    </div>
  </div>
)

export default Header;

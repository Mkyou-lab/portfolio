const Footer = ({ profile }) => {
  return (
    <footer className="border-t border-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center text-gray-500">
        <p>
          © {new Date().getFullYear()}{' '}
          {profile?.fullName || 'Portfolio'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
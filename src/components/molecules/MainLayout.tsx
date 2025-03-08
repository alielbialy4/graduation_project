type MainLayout_TP = {
  children: any;
};

function MainLayout({ children }: MainLayout_TP) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-5xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;

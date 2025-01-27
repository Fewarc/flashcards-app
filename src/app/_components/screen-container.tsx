interface ScreenContainerProps {
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  return (
    <main className="m-auto flex min-h-screen max-w-7xl flex-col items-center justify-center bg-white px-2">
      {children}
    </main>
  );
};

export default ScreenContainer;

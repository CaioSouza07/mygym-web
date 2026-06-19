import Header from "../components/layout/Header";

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col items-center min-h-screen p-4 gap-2 max-w-250">
        <Header />
      </div>
    </div>
  );
}

export default HomePage;

import FuzzyText from "@/components/FuzzyText";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <main className="grid h-screen place-items-center bg-sinii px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col justify-center items-center">
          <FuzzyText baseIntensity={0.2} fontSize="10rem">
            404
          </FuzzyText>
          <Link to="/">
            <div className="flex items-center mt-20">
              <p className="text-white text-3xl text-center">Домой</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Error;

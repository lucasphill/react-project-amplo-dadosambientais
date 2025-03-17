import AddStation from "../components/StationForm";
import StationTable from "../components/StationTable";
import TopNavigation from "../components/TopNavigation";

function Stations() {
  //#endregion
  return (
    <>
      <TopNavigation></TopNavigation>
      <div className="p-8 m-auto max-w-[1024px] bg-foreground-900 rounded-[8px] mt-8">
        <div className="text-4xl text-center pt-4">
          <h1>Menu de estações de análise</h1>
        </div>
        <AddStation></AddStation>
        <StationTable></StationTable>
      </div>
      {/* footer */}
    </>
  );
}

export default Stations;

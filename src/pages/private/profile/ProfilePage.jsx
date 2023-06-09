import { Fragment, useState, useEffect } from "react";
import Navigator from "../../../components/Navigator";
import StatisticsProfile from "./Statistics";
import { getAuthenticatedUser } from "../../../config/ConfigIdentity";
import NewExercise from "../admin/newExercise/NewExercise";
import ProfileData from "./ProfileData";
import NewResource from "../admin/newResource/NewResource";

function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState(1);
  const handleButtonClick = (componentNumber) => {
    setActiveComponent(componentNumber);
  };
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUser() {
      const user = await getAuthenticatedUser();
      setUser(user);
    }
    getUser();
  }, []);

  const isAdmin = user && user.profile.role === "admin";

  return (
    <Fragment>
      <Navigator />
      <div className="container mt-2">
        <div className="container mb-2">
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
            <label onClick={() => handleButtonClick(1)} className="btn btn-outline-primary" htmlFor="btnradio1">
              Statistics
            </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
            <label onClick={() => handleButtonClick(2)} className="btn btn-outline-primary" htmlFor="btnradio2">
              Profile
            </label>
            {isAdmin && (
              <>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                <label onClick={() => handleButtonClick(3)} className="btn btn-outline-primary" htmlFor="btnradio3">
                  Create New Exercise
                </label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" />
                <label onClick={() => handleButtonClick(4)} className="btn btn-outline-primary" htmlFor="btnradio4">
                  Create New Resource
                </label>
              </>
            )}
          </div>
        </div>
        <div className="container">
          {activeComponent === 1 && <StatisticsProfile />}
          {activeComponent === 2 && <ProfileData />}
          {activeComponent === 3 && <NewExercise />}
          {activeComponent === 4 && <NewResource />}
        </div>
      </div>
    </Fragment>
  );
}

export default ProfilePage;

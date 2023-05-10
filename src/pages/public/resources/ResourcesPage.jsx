import { GetResources } from "../../../services/ResourcesService";
import Navigator from "../../../components/Navigator";
import { Link } from "react-router-dom";
function ResourcesPage() {
  const resources = GetResources();
  if (!resources){
    return (<>
      <p>Loading...</p>
    </>);
  }
  return (
    <>
      <Navigator />
      <div className="container mt-4">
        <h1>Resources</h1>
        <div className="container mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Summary</th>
                  <th scope="col">Date</th>
                  <th scope="col">Get</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr key={index}>
                    <th scope="row">{resource.Id}</th>
                    <td>{resource.Title}</td>
                    <td>{resource.Summary}</td>
                    <td>{new Date(resource.Date).toLocaleDateString()}</td>
                    <td>
                      <Link to={"/resource/" + resource.Id} className="btn btn-primary">
                        Resource
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
}

export default ResourcesPage;
import Navigator from "../../../components/Navigator";
import { GetResource } from "../../../services/ResourcesService";
import { useParams } from "react-router-dom";

function ResourcePage() {
    const { id } = useParams();
    const resource = GetResource(id);

    if (!resource) {
        return (
            <>
                <Navigator />
                <p>Loading...</p>
            </>
        );
    }

    return (
        <>
            <Navigator />
            <div className="container mt-3">
                <h1>{resource.Title}</h1>
                <div
                    className="resource-content"
                    dangerouslySetInnerHTML={{ __html: resource.Content }}
                ></div>
            </div>
        </>
    );
}

export default ResourcePage;

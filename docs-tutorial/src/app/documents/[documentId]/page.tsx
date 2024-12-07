import { Editor } from "./editor";
interface DocumentIdPageProps{
    params: Promise<{documentId: string }>
}

const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params;
    return ( 
        <div className="">
            Document ID: {documentId}
            <Editor/>
        </div>
     );
}
 
export default DocumentIdPage;
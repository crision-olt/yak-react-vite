import { FC, ReactElement, useEffect, useState }    from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { Modal }                                    from "@/components/modal/Modal";
import { ButtonFactory, ButtonFactoryProps }        from "@/components/buttonFactory/ButtonFactory";
import { showToast }                                from "@/modulesTypes";
import firebase                                     from "firebase/compat";
import { cancelButton, confirmButton }              from "@/keys/buttons";
import DocumentData = firebase.firestore.DocumentData;

type ContextDeleteModal = {
    deleteModal: {
        header: string,
        body: string,
        success: string,
        error: string,
    },
    onClose: () => void,
    deleteDocument: (id: string) => Promise<boolean>,
    getById: (id: string) => Promise<DocumentData | undefined>
}
const DeleteModal: FC = (): ReactElement => {
    const location = useLocation();
    const { deleteModal, onClose, deleteDocument, getById } = useOutletContext<ContextDeleteModal>();
    const { id } = useParams();
    // @ts-ignore
    const [element, setElement] = useState(location?.state?.element);

    const getElement = () => {
        !element && id && getById(id).then(setElement);
    };
    useEffect(getElement, [id]);

    const confirm = () => {
        if (!id || !deleteDocument(id)) {
            showToast({ content: deleteModal.error });
            return;
        }
        showToast({ content: deleteModal.success });
        onClose();
    };

    const buttonFactoryProps: ButtonFactoryProps = {
        cols: 2,
        buttons: [{ ...confirmButton, onClick: confirm }, { ...cancelButton, onClick: onClose }],
    };
    return (
        <Modal.Frame open={true} onClose={onClose}>
            <Modal.Head>{`${deleteModal.header} ${element && element["name"]}`}</Modal.Head>
            <Modal.Body>{deleteModal.body}</Modal.Body>
            <Modal.Actions><ButtonFactory {...buttonFactoryProps}/></Modal.Actions>
        </Modal.Frame>
    );
};
export default DeleteModal;
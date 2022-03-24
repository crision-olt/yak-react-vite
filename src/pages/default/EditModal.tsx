import { FC, ReactElement, useEffect, useState }    from "react";
import { useForm }                                  from "react-hook-form";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { FormFactory, FormFactoryProps }            from "@/components/formFactory/FormFactory";
import { Modal }                                    from "@/components/modal/Modal";
import { ButtonFactory, ButtonFactoryProps }        from "@/components/buttonFactory/ButtonFactory";
import { showToast }                                from "@/modulesTypes";
import { FormKey }                                  from "@/types/forms";
import { cancelButton, saveButton }                 from "@/keys/buttons";

type ContextEditModal = {
    formKeys: FormKey[],
    editModal: {
        header: string,
        success: string,
        error: string,
    },
    updateDocument: (id: string, newFields: any) => Promise<boolean>,
    onClose: () => void,
    getById: (id: string) => Promise<any>
};

const EditModal: FC = (): ReactElement => {
    const location = useLocation();
    const { id } = useParams();
    // @ts-ignore
    const [element, setElement] = useState(location.state.element);
    const form = useForm();
    const { editModal, onClose, updateDocument, getById, formKeys } = useOutletContext<ContextEditModal>();
    const getElement = () => {
        !element && id && getById(id).then(setElement);
    };
    useEffect(getElement, [id]);


    const onSubmit = (data: any) => {
        if (!id || !updateDocument(id, data)) {
            showToast({ content: editModal.error });
            return;
        }
        showToast({ content: editModal.success });
        onClose();
    };
    const buttonFactoryProps: ButtonFactoryProps = {
        cols: 2,
        buttons: [{ ...saveButton }, { ...cancelButton, onClick: onClose }],
    };

    const formProps: FormFactoryProps = {
        form, data: element, cols: 8, inputs: formKeys,
    };
    return (
        <Modal.Frame onClose={onClose}>
            <form method="#" action="#" onSubmit={form.handleSubmit(onSubmit)}>
                <Modal.Head>{editModal.header} {element["name"]}</Modal.Head>
                <Modal.Body><FormFactory {...formProps}/></Modal.Body>
                <Modal.Actions><ButtonFactory {...buttonFactoryProps}/></Modal.Actions>
            </form>
        </Modal.Frame>
    );
};
export default EditModal;
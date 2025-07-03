import type React from 'react';
import Modal from '@/components/ui/modal/Modal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import useAddMenuGroups from '../hooks/addMenuGroups.hook';

const ModalAddMenuGroups: React.FC = () => {
  const { form, onSubmit, onCancel } = useAddMenuGroups();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Modal
      title="Add New Group"
      action={
        <div className="flex gap-4">
          <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
          <ButtonPrimary
            type="submit"
            form="add-group-form"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </ButtonPrimary>
        </div>
      }
      onClose={onCancel}
    >
      <form id="add-group-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              id="name"
              label="Name"
              placeholder="Enter your group name"
              error={errors.name?.message}
              required
              {...register('name')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              id="email"
              label="Description"
              placeholder="Enter your description"
              error={errors.desc?.message}
              required
              {...register('desc')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddMenuGroups;

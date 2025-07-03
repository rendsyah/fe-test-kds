import type React from 'react';
import { Controller } from 'react-hook-form';
import Modal from '@/components/ui/modal/Modal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import useAddMenus from '../hooks/addMenus.hook';

const ModalAddMenus: React.FC = () => {
  const { menuGroupsOptions, form, onSubmit, onCancel } = useAddMenus();

  const {
    register,
    control,
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
            <Controller
              name="group_id"
              control={control}
              render={({ field }) => (
                <Select
                  id="group_id"
                  label="Group"
                  placeholder="Choose Group"
                  value={field.value}
                  onChange={field.onChange}
                  options={menuGroupsOptions}
                  error={errors.group_id?.message}
                  required
                />
              )}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="name"
              label="Name"
              placeholder="Enter your group name"
              error={errors.name?.message}
              required
              {...register('name')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="path"
              label="Path"
              placeholder="Enter your path"
              error={errors.path?.message}
              required
              {...register('path')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddMenus;

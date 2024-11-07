import { SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
          })}
          id="email"
          placeholder="Email"
        />
        {errors.email && (
          <div style={{ color: 'red' }}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          {...register('password', {
            minLength: {
              value: 8,
              message: 'Password must be 8 characters long',
            },
          })}
          id="password"
          placeholder="Password"
        />
        {errors.password && (
          <div style={{ color: 'red' }}>{errors.password.message}</div>
        )}
      </div>
      <button type={isSubmitting}>
        {isSubmitting ? 'loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ModalWrapper from '../../app/common/Modals/ModalWrapper';
import MytextInput from '../../app/common/Form/MyTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { user_sign_in_with_email_and_password } from './authSlice';
import SocialLogin from './SocialLogin';

const Login = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.auth.error);
	return (
		<ModalWrapper size='mini' header='Sign in'>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(user_sign_in_with_email_and_password({ values }));
					setSubmitting(false);
				}}>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<MytextInput name='email' placeholder='email address' />
						<MytextInput
							name='password'
							placeholder='password'
							type='password'
						/>
						{error && (
							<Label
								basic
								color='red'
								style={{ marginBottom: 10 }}
								content={error}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='login'
						/>
						<Divider horizontal>Or</Divider>
						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
};

export default Login;

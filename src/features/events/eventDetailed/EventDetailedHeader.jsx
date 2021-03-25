import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { user_cancel_event, user_join_event } from '../EventSlice';
const eventImageStyle = {
	filter: 'brightness(30%)',
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

export default function EventDetailedHeader({ id, event, isHost, isGoing }) {
	const dispatch = useDispatch();
	const join_this_event = () => {
		dispatch(user_join_event({ event }));
	};
	const cancel_event = () => {
		dispatch(user_cancel_event({ event }));
	};
	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0' }}>
				<Image
					src={`/assets/categoryImages/drinks.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={event.title === undefined ? '' : event.title}
									style={{ color: 'white' }}
								/>
								<p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
								<p>
									Hosted by{' '}
									<strong>
										<Link to={`/profile/${event.hostUid}`}>
											{event.hostedBy}
										</Link>
									</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached='bottom' clearing>
				{!isHost && (
					<React.Fragment>
						{isGoing ? (
							<Button onClick={cancel_event}>Cancel My Place</Button>
						) : (
							<Button color='teal' onClick={join_this_event}>
								JOIN THIS EVENT
							</Button>
						)}
					</React.Fragment>
				)}

				{isHost && (
					<Button as={Link} to={`/manage/${id}`} color='orange' floated='right'>
						Manage Event
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
}

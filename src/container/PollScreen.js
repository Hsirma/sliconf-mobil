/**
 * Created by Berkay 03.09.2018
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Platform,
	Modal,
	ScrollView,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { actionCreators as surveyAction } from '../reducks/module/survey';
import Header from '../component/Header';
import AnswersView from '../component/AnswersView';
import { LeftRight } from '../component/Selectables';
import Color from '../theme/Color';
import * as Scale from '../theme/Scale';
import Font from '../theme/Font';

const mapStateToProps = (state) => ({
	surveys: state.survey.surveys,
	answered: state.survey.answered,
	error: state.survey.error,
	user: state.auth.login ? state.auth.user : state.authDevice.user,
	event: state.event.event
});

class PollScreen extends Component {
	state = {
		surveys: [],
		surveyId: '',
		currentIndex: 0,
		selectedAnswers: [],
		surveyModal: false,
		surveySelected: false
	};

	async componentWillMount() {
		const { dispatch, event, user } = this.props; //const eventId = event.id;

		//Get answered surveys
		await dispatch(surveyAction.getAnsweredSurveys(event.id, user.id));
		//Get surveys
		await dispatch(surveyAction.getSurveys(event.id));

		const { surveys, answered } = this.props;

		if (surveys) {
			if (answered) {
				const notAnswered = surveys.filter(
					(element) => answered.indexOf(element) === -1
				);
				this.setState({
					surveys: notAnswered
				});
			}
			this.setState({
				surveys
			});
		}
	}

	onAnswerSelect = (currentIndex, questionId, answerId, answerText) => {
		const selectedAnswers = this.state.selectedAnswers;

		if (answerId && answerText && answerText.trim() !== '') {
			selectedAnswers[currentIndex] = {};
			selectedAnswers[currentIndex]['question'] = questionId;
			selectedAnswers[currentIndex]['id'] = answerId;
			selectedAnswers[currentIndex]['text'] = answerText;
		} else {
			selectedAnswers[currentIndex] = {};
			selectedAnswers[currentIndex]['question'] = '';
			selectedAnswers[currentIndex]['id'] = '';
			selectedAnswers[currentIndex]['text'] = '';
		}

		this.setState({
			selectedAnswers
		});
	}
	/**
	 * Handless Submit button click
	 * @param {string} surveyId unique survey id
	 * @returns {state} changes current state to survey answering complete state
	 */
	onSubmit = async () => {
		const { surveyId, selectedAnswers } = this.state;
		const { dispatch, event, user } = this.props;

		if (selectedAnswers && selectedAnswers.length > 0) {
			const answeredQuestions = selectedAnswers.map(index => {
				return {
					[index.question]: index.text
				};
			});

			const postObject = {
				surveyId,
				userId: user.id,
				eventId: event.id,
				answeredQuestions
			};
			//Sends user answers to remote
			await dispatch(
				surveyAction.postAnswers(
					event.id,
					surveyId,
					postObject
				)
			);

			const { error } = this.props;

			if (!error) {
				this.setState(
					{
						surveyId: '',
						currentIndex: 0,
						selectedAnswers: [],
						surveyModal: false,
						surveySelected: false
					}, () => Alert.alert(
						'You answers has been saved.',
						'Thank you for participating in this survey.',
						[
							{ text: 'OK' },
						],
						{ cancelable: false }
					)
				);
			} else {
				Alert.alert(
					'Warning!',
					'Answer submitting failed!',
					[
						{ text: 'OK' },
					],
					{ cancelable: false }
				);
			}
		} else {
			Alert.alert(
				'You must answer a question.',
				'Please select an answer for at least one question.',
				[
					{ text: 'OK' },
				],
				{ cancelable: false }
			);
		}
	}

	onNext = () => {
		let currentIndex = this.state.currentIndex;

		currentIndex = Number(Number(currentIndex) + 1);

		this.setState({
			currentIndex
		});
	}

	onPrevious = () => {
		let currentIndex = this.state.currentIndex;

		currentIndex = Number(Number(currentIndex) - 1);

		this.setState({
			currentIndex
		});
	}

	getPollSelectButton = (surveys) => {
		const { surveyId, surveySelected } = this.state;

		let selectButton = (
			<TouchableOpacity
				style={styles.selectPollButton}
				onPress={() => this.setState({ surveyModal: true })}
			>
				<View style={styles.selectPollButton}>
					<Text style={styles.selectAPollText}>Select a Survey</Text>
				</View>
			</TouchableOpacity>
		);

		if (surveySelected) {
			selectButton = surveys.filter(survey => survey.id === surveyId).map((data) =>
				<TouchableOpacity
					key={data.id}
					style={styles.selectPollButton}
					onPress={() =>
						this.setState({
							surveyId: '',
							surveyModal: true,
							surveySelected: false
						})
					}
				>
					<View style={styles.selectPollButton}>
						<Text style={styles.selectPollButtonText}>{data.name}</Text>
					</View>
				</TouchableOpacity>
			);
		}
		return selectButton;
	}

	getPollModal(surveys) {
		return (
			<Modal
				transparent
				animationType={'slide'}
				visible={this.state.surveyModal}
				onRequestClose={() => this.closePollModal()}
			>
				<View style={styles.pollModalViewStyle}>
					<TouchableOpacity
						style={{ padding: 4, margin: 8 }}
						onPress={() => this.closePollModal()}
					>
						<Icon name={'ios-close-circle'} size={32} color={Color.gray} />
					</TouchableOpacity>
					<ScrollView style={{ flex: 1 }}>
						{this.getPollButtons(surveys)}
					</ScrollView>
				</View>
			</Modal>
		);
	}

	getPollButtons(surveys) {
		let buttons = [];

		surveys.forEach((survey) => {
			buttons.push(
				(
					<TouchableOpacity
						key={survey.id}
						onPress={() => {
							this.increaseViewCount(survey.id);
							this.setState({
								surveyId: survey.id,
								currentIndex: 0,
								surveyModal: false,
								surveySelected: true,
								selectedAnswers: []
							});
						}
						}
					>
						<View style={styles.selectPollButton}>
							<Text style={styles.selectAPollText}>{survey.name}</Text>
						</View>
					</TouchableOpacity>
				)
			);
		});

		if (buttons.length <= 0) {
			buttons.push(
				(<View key={'expired'} style={styles.notFoundPanel}>
					<Text style={styles.notFoundText}>Surveys expired or does not exist</Text>
				</View>)
			);
		}
		return buttons;
	}

	increaseViewCount(surveyId) {
		const { dispatch, event, user } = this.props;
		dispatch(
			surveyAction.increaseViewCount(
				event.id,
				surveyId,
				user.id
			)
		);
	}

	closePollModal = () => {
		this.setState({ surveyId: '', surveyModal: false, surveySelected: false });
	}

	render() {
		const { surveys, surveyId, currentIndex, surveySelected, selectedAnswers } = this.state;

		let currentQuestion,
			currentAnswers,
			surveyLength;

		if (surveySelected) {
			const currentSurvey = surveys.find(survey => survey.id === surveyId);
			surveyLength = currentSurvey.questions.length;
			if ((surveyLength > currentIndex) && (currentIndex > -1)) {
				currentQuestion = currentSurvey.questions[currentIndex];
				currentAnswers = currentQuestion.options;
			}
		}

		return (
			<View style={styles.container}>
				<Header
					leftImage='chevron-left'
					rightImage='bars'
					onPressLeft={() => this.props.navigation.goBack()}
					onPressRight={() => {
						this.props.navigation.navigate('DrawerOpen');
					}}
				>
					<Header.Title title="Survey Screen" />
				</Header>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 0.12 }}>
						{this.getPollSelectButton(surveys)}
					</View>
					{
						(surveySelected && currentQuestion && currentAnswers) &&
						(
							<View
								style={{
									flex: 0.88,
									alignSelf: 'flex-start',
									alignItems: 'flex-start'
								}}
							>
								<View style={styles.answerViewContainer}>
									<AnswersView
										questionId={currentQuestion.id}
										questionName={currentQuestion.text}
										answers={currentAnswers}
										onAnswerSelect={this.onAnswerSelect}
										currentIndex={currentIndex}
										selectedAnswers={selectedAnswers}
									/>
								</View>
								<LeftRight
									onNext={this.onNext}
									onSubmit={this.onSubmit}
									onPrevious={this.onPrevious}
									nextDisabled={currentIndex === (surveyLength - 1)}
									previousDisabled={currentIndex === 0}
									viewStyle={{ height: 50, flexDirection: 'row' }}
									buttonStyle={[
										styles.leftRightButton,
										{ width: Scale.width / 3 }
									]}
									textStyle={{
										...Font.regular,
										textAlign: 'center',
										color: Color.white
									}}
								/>
							</View>
						)
					}
				</View>
				{this.getPollModal(surveys)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
	},
	answerViewContainer: {
		flex: 0.845,
		width: Scale.width,
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: Color.white
	},
	selectPollButton: {
		justifyContent: 'center',
		borderTopWidth: 0.8,
		borderBottomWidth: 0.8,
		borderColor: Color.green,
		height: Scale.verticalScale(68)
	},
	selectPollButtonText: {
		...Font.regular,
		textAlign: 'center',
		color: Color.green,
		fontSize: Scale.verticalScale(16),
		padding: 2
	},
	selectAPollText: {
		...Font.regular,
		textAlign: 'center',
		color: Color.black,
		fontSize: Scale.verticalScale(16),
		padding: 2
	},
	pollModalViewStyle: {
		flex: 1,
		backgroundColor: Color.white,
		marginTop: Platform.OS === 'ios' ? 16 : 0
	},
	buttonContainer: {
		backgroundColor: Color.green,
		borderRadius: 10,
		marginHorizontal: 20,
		height: 40
	},
	leftRightButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		marginHorizontal: '10%',
		height: '100%',
	},
	notFoundText: {
		...Font.thin,
		flex: 1,
		fontSize: Scale.verticalScale(16),
		alignSelf: 'center',
		color: Color.darkGray
	},
	notFoundPanel: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center'
	}
});

export default connect(mapStateToProps)(PollScreen);

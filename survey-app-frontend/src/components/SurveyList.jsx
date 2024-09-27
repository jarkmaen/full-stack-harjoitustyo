import { Button, Card, Col, Row } from 'react-bootstrap'
import { closeSurvey } from '../reducers/surveys'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { LuClock } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const SurveyList = ({ closed }) => {
    const dispatch = useDispatch()
    const surveys = useSelector(({ surveys }) => surveys)
    const filteredSurveys = surveys.filter((survey) => survey.closed === closed)
    const handleCloseSurvey = async (event, id) => {
        event.preventDefault()
        try {
            dispatch(closeSurvey(id))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Row className="mt-4">
            {filteredSurveys.map((survey) => (
                <Col className="mb-4" key={survey.id} md={4}>
                    <Card className="survey-card">
                        <Card.Body>
                            <Card.Title className="align-items-center d-flex">
                                <HiOutlineClipboardDocumentCheck className="me-2" /> Survey
                            </Card.Title>
                            <Card.Text className="fw-bold survey-card-title">{survey.title}</Card.Text>
                            <Card.Text className="align-items-center d-flex survey-card-time">
                                <LuClock className="me-2" /> ~{(survey.questions.length * 0.5).toFixed(1)} min
                            </Card.Text>
                            <div className="d-flex justify-content-between">
                                <Button
                                    as={Link}
                                    className="flex-grow-1 mx-1 survey-card-button"
                                    to={`/surveys/${survey.id}`}
                                    variant="primary"
                                >
                                    {closed ? 'View Results' : 'Take Survey'}
                                </Button>
                                {!closed && (
                                    <Button
                                        className="flex-grow-1 mx-1 survey-card-button"
                                        onClick={(event) => handleCloseSurvey(event, survey.id)}
                                        variant="danger"
                                    >
                                        Close Survey
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            <Col className="mb-4" md={4}>
                <Card className="align-items-center create-survey-card d-flex justify-content-center">
                    <Link className="create-survey-link" to="/create-survey">
                        <FaPlus className="create-survey-icon" />
                        <span className="create-survey-text fw-bold">Create Survey</span>
                    </Link>
                </Card>
            </Col>
        </Row>
    )
}

export default SurveyList

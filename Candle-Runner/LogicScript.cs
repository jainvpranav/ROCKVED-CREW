using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using System.Linq;
using System;
using UnityEngine.TextCore.Text;
using System.Threading;
public class LogicScript : MonoBehaviour
{  
    public int playerScore;
    public Text scoreText;
    public GameObject gameOverScreen;
    public GameObject Astrid;
    public GameObject mainMenu;
    public GameObject Questions;
    public GameObject Pipe;
    public GameObject VideoPlayer;

    public GameObject Hint;
    public  QuestionsAnswers[] question;
    private static  List<QuestionsAnswers> unansweredQuestions;
    int count = 0;
    
    private QuestionsAnswers currentQuestion;

    [SerializeField]
    private Text question_text;

    [SerializeField]
    private Text correctAnswer_text;
    [SerializeField]
    private Text wrongAnswer_text;
    
    public float timeBetweenEachQuestions = 1f;
    public GameObject correct_pipe;
    public GameObject wrong_pipe;
    public void addScore() {
        playerScore = playerScore + 1;
        scoreText.text = playerScore.ToString();
        // SetCurrentQuestion();
        // Destroy(Questions);
        // Instantiate(Questions, new Vector3(0,0,0), new Quaternion());

        //StartCoroutine(TransitionToNextQuestion());
        Debug.Log(playerScore);
    }
        
    public void restartGame() {
        Debug.Log("pressed");
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void gameOver() {
        gameOverScreen.SetActive(true);
        Questions.SetActive(false);
    }

    public void startGame() {
        mainMenu.SetActive(false);
        Pipe.SetActive(true);
        Questions.SetActive(true);
        Hint.SetActive(true);
        Astrid.SetActive(true);
        VideoPlayer.SetActive(true);
        // StartCoroutine(ExampleCoroutine();

    }

    public void button_pause() {
        Time.timeScale = 1;
        Hint.SetActive(false);
        Astrid.SetActive(false);
        VideoPlayer.SetActive(false);
    }


    public void Start() {
        Time.timeScale = 0;
        
        if(unansweredQuestions == null || unansweredQuestions.Count == 0) {
            unansweredQuestions = question.ToList<QuestionsAnswers>();
        }
        SetCurrentQuestion();
        //Debug.Log(currentQuestion.question + " is " + currentQuestion.isTrue);
    }

    public void SetCurrentQuestion() {
        int randomQuestionIndex = count;
        currentQuestion = unansweredQuestions[randomQuestionIndex];
        

        question_text.text = currentQuestion.question;
        correctAnswer_text.text = currentQuestion.correctAnswer;
        wrongAnswer_text.text = currentQuestion.wrongAnswer;

        
        unansweredQuestions.RemoveAt(randomQuestionIndex);
        Debug.Log(correct_pipe.transform.position);
    }

    void Update() {
        if(correct_pipe.transform.position.y < 0) {
            correctAnswer_text.transform.position = correct_pipe.transform.position*10 + new Vector3(900f, correct_pipe.transform.position.y + 500f, 0);
            // Debug.Log(, correctAnswer_text.transform);
            wrongAnswer_text.transform.position = wrong_pipe.transform.position * 10 + new Vector3(900f, wrong_pipe.transform.position.y + 600f, 0);
        }
        else {
            correctAnswer_text.transform.position = correct_pipe.transform.position*10 + new Vector3(900f, correct_pipe.transform.position.y + 600f, 0);
            // Debug.Log(, correctAnswer_text.transform);
            wrongAnswer_text.transform.position = wrong_pipe.transform.position * 10 + new Vector3(900f, wrong_pipe.transform.position.y + 500f, 0);
        }
    }

    IEnumerator ExampleCoroutine()
    {
        //Print the time of when the function is first called.
        Debug.Log("Started Coroutine at timestamp : " + Time.time);

        //yield on a new YieldInstruction that waits for 5 seconds.
        yield return new WaitForSeconds(5);

        //After we have waited 5 seconds print the time again.
        // Debug.Log("Finished Coroutine at timestamp : " + Time.time);
        Time.timeScale = 1;
    }
}

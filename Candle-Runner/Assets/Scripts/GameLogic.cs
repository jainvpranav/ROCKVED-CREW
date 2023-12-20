using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using System;
using System.Linq.Expressions;

public class GameLogic : MonoBehaviour
{
    private int playerScore = 0;
    
    public GameObject options;
    public GameObject correctOptionBlock;
    public GameObject mainMenu;
    public Text scoreText;
    public GameObject player;
    public GameObject correctOption;
    public Text question_text;
    public Text correctOption_text;
    public Text wrongOption_text;
    public GameObject LeftBlock;
    public GameObject Hint;
    public GameObject Video;
    public GameObject Astrid;
    public GameObject OptionsCanvas;
    int count = 0;

    public QuestionsAnswers[] questions;
    private static  List<QuestionsAnswers> unansweredQuestions;
    private QuestionsAnswers currentQuestion;
    
    void Start()
    {
        mainMenu.SetActive(true);
        Time.timeScale = 0;
        if(unansweredQuestions == null || unansweredQuestions.Count == 0) {
            unansweredQuestions = questions.ToList<QuestionsAnswers>();
        }
        SetCurrentQuestion();
        
    }

    // Update is called once per frame
    void Update()
    {
        if(player.transform.position.z > options.transform.position.z+10f) {
            options.transform.position = new Vector3(options.transform.position.x, options.transform.position.y, options.transform.position.z + 40f);
            options.transform.rotation = new Quaternion(0,UnityEngine.Random.Range(0,2) * 180, 0,0);
            SetCurrentQuestion();
            // Debug.Log(correctOptionBlock.transform.position.x);
            if(correctOptionBlock.transform.position.x < 0) {
                correctOption_text.transform.position = new Vector3((correctOptionBlock.transform.position.x * 38.74f) + 1000f, correctOption_text.transform.position.y, 0);
                wrongOption_text.transform.position = new Vector3((LeftBlock.transform.position.x * 17.83f) + 1000f, correctOption_text.transform.position.y,0);
            }
            else {
                correctOption_text.transform.position = new Vector3((correctOptionBlock.transform.position.x * 38.74f)+1000f, correctOption_text.transform.position.y, 0);
                wrongOption_text.transform.position = new Vector3((LeftBlock.transform.position.x * 17.83f)+1000f, correctOption_text.transform.position.y,0);
            }
            Debug.Log( wrongOption_text.transform.position);
        }
    }

    public void StartGame() {
        mainMenu.SetActive(false);
        options.SetActive(false);
        Hint.SetActive(true);
        Video.SetActive(true);
        Astrid.SetActive(true);
    }

    public void Button_tryOut(){
        OptionsCanvas.SetActive(true);
        options.SetActive(true);
        Hint.SetActive(false);
        Video.SetActive(false);
        Astrid.SetActive(false);
        Time.timeScale = 1;
    }
    public void addScore() {
        playerScore = playerScore + 1;
        scoreText.text = playerScore.ToString();
        // SetCurrentQuestion();
        // Destroy(Questions);
        // Instantiate(Questions, new Vector3(0,0,0), new Quaternion());
        //StartCoroutine(TransitionToNextQuestion());
        Debug.Log(playerScore);
    }

    void SetCurrentQuestion() {
        int randomQuestionIndex = count;
        currentQuestion = unansweredQuestions[randomQuestionIndex];
        question_text.text = currentQuestion.question;
        correctOption_text.text = currentQuestion.correctAnswer;
        wrongOption_text.text = currentQuestion.wrongAnswer;
        unansweredQuestions.RemoveAt(randomQuestionIndex);
    }

    
}

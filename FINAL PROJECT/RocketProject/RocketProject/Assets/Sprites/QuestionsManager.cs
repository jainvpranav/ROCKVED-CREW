using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using System.Linq;

public class QuestionsManager : MonoBehaviour
{
    public AllQuestionsManager allQuestionsManager;
    public int currentQuestionIndex;
    public Question currentQuestion;

    public GameObject questionsBox;

    public AnswerBoxLogic[] allAnswerBoxes = new AnswerBoxLogic[4];
    public TextMeshProUGUI questionsText;

    public List<Question> allQuestions = new List<Question>();

    private void Start()
    {
        questionsBox.SetActive(false);
    }

    public void SetupAllQuestions()
    {
        questionsBox.SetActive(true);

        allQuestions = allQuestionsManager.allPossibleQuestions.ToList();
        Shuffle(allQuestions);
        Question firstQuestion = allQuestions[currentQuestionIndex];

        SetupQuestion(firstQuestion);

       // Shuffle(allQuestions);
    }

    public void SetupQuestion(Question questionInfo)
    {
        questionsBox.SetActive(true);


        currentQuestion = questionInfo;

        questionsText.text = questionInfo.questionText;

        for (int i = 0; i < allAnswerBoxes.Length; i++)
        {
            allAnswerBoxes[i].SetText(questionInfo.allAnswers[i].answer, questionInfo.allAnswers[i].isCorrectAnswer);
        }
    }

    public void AnsweredQuestion(int answerIndex, PlayerController playerController)
    {
        if (playerController.playerIndex == 1)
        {
            if(answerIndex == 0)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);

            }
            else if (answerIndex == 1)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
            else if (answerIndex == 2)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
            else if (answerIndex == 3)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
        }
        else if(playerController.playerIndex == 2)
        {
            if (answerIndex == 0)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
            else if (answerIndex == 1)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
            else if (answerIndex == 2)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
            else if (answerIndex == 3)
            {
                if (currentQuestion.allAnswers[answerIndex].isCorrectAnswer)
                    CorrectAnswer(playerController);
                else
                    WrongAnswer(playerController);
            }
        }
    }

    public void CorrectAnswer(PlayerController player)
    {
        print($"{player.playerName} got a question correct");

        questionsBox.SetActive(false);


        player.MovePlayerUp();

        StartCoroutine(NextQuestionDelay());

    }

    public void WrongAnswer(PlayerController player)
    {
        print($"{player.playerName} got a question wrong");
    }


    public IEnumerator NextQuestionDelay()
    {

        yield return new WaitForSeconds(3);

        if (FindObjectOfType<GameManager>().hasPlayerWon == false)
            MoveOntoNextQuestion();
    }

    public void MoveOntoNextQuestion()
    {
        
        currentQuestionIndex++;

        Question firstQuestion = allQuestions[currentQuestionIndex];

        SetupQuestion(firstQuestion);
       
    }

    public void Shuffle<T>(List<T> list)
    {
        System.Random random = new System.Random(Random.Range(0, 100000));
        int n = list.Count;
        while (n > 1)
        {
            int k = random.Next(n);
            n--;
            T temp = list[k];
            list[k] = list[n];
            list[n] = temp;
        }
    }

    /*System.Random rng = new System.Random();
    public void Shuffle(List<Question> list)
    {
        int n = list.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            T value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
    }
    */
}

[System.Serializable]
public class Question
{
    public string questionText;

    public Answer[] allAnswers;
}

[System.Serializable]
public class Answer
{
    public string answer;
    public bool isCorrectAnswer;
}

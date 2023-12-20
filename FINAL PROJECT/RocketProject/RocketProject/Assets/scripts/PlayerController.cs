using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public string playerName;
    public int playerIndex;

    public int numberOfCorrect;

    public KeyCode answerOneKey;
    public KeyCode answerTwoKey;
    public KeyCode answerThreeKey;
    public KeyCode answerFourKey;

    public void Update()
    {
        if(Return_IsQuestionAvailable() == true)
            PlayerInputController();
    }

    public void Start()
    {
        if (playerIndex == 1)
            playerName = GameStorageManager.playerOne;
        else
            playerName = GameStorageManager.playerTwo;
    }

    public void PlayerInputController()
    {
        if(Input.GetKeyDown(answerOneKey))
        {
            FindObjectOfType<QuestionsManager>().AnsweredQuestion(0, this);
        }
        else if (Input.GetKeyDown(answerTwoKey))
        {
            FindObjectOfType<QuestionsManager>().AnsweredQuestion(1, this);
        }
        else if (Input.GetKeyDown(answerThreeKey))
        {
            FindObjectOfType<QuestionsManager>().AnsweredQuestion(2, this);
        }
        else if (Input.GetKeyDown(answerFourKey))
        {
            FindObjectOfType<QuestionsManager>().AnsweredQuestion(3, this);
        }
    }

    public bool Return_IsQuestionAvailable()
    {
        if (FindObjectOfType<QuestionsManager>().questionsBox.activeSelf == true)
            return true;

        else return false;
    }

    public void MovePlayerUp()
    {
        GetComponent<PlayerMovement>().MoveUpwards(numberOfCorrect);

        numberOfCorrect++;
        if (numberOfCorrect >= 5)
            FindObjectOfType<GameManager>().GameEnd(this);
    }

    
}

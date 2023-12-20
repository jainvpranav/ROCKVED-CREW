using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public PlayerController playerOne;
    public PlayerController playerTwo;

    public TextMeshProUGUI countDownTimer;

    public GameObject endGameUI;
    public TextMeshProUGUI winningPlayerText;


    public bool hasPlayerWon;

    public void Start()
    {
        StartCoroutine(TimerCountDown());
    }

    public IEnumerator TimerCountDown()
    {
        countDownTimer.gameObject.SetActive(true);

        countDownTimer.text = "5";
        yield return new WaitForSeconds(1);
        countDownTimer.text = "4";
        yield return new WaitForSeconds(1);
        countDownTimer.text = "3";
        yield return new WaitForSeconds(1);
        countDownTimer.text = "2";
        yield return new WaitForSeconds(1);
        countDownTimer.text = "1";
        yield return new WaitForSeconds(1);
        countDownTimer.text = "GO";
        yield return new WaitForSeconds(1);

        countDownTimer.gameObject.SetActive(false);

        SetupGame();
    }

    public void SetupGame()
    {
        FindObjectOfType<QuestionsManager>().SetupAllQuestions();
        
    }

    

    public void GameEnd(PlayerController winningPlayer)
    {
         
        print($"{winningPlayer.playerName} won the game");
        hasPlayerWon = true;

        //endGameUI.SetActive(true);
        //winningPlayerText.text = winningPlayer.playerName;


        //This is where we bring up UI showing who won.

    }
}

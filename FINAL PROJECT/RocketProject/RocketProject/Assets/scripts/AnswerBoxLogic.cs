using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class AnswerBoxLogic : MonoBehaviour
{

    public TextMeshProUGUI answerText;
    public bool isCorrectAnswer;


    public void SetText(string answerText, bool isCorrect)
    {
        this.answerText.text = answerText;
        isCorrectAnswer = isCorrect;
    }

}

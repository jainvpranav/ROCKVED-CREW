using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class MainMenuManager : MonoBehaviour
{
    public TMP_InputField playerOneInput;
    public TMP_InputField playerTwoInput;
    

    /// <summary>
    /// Add this function to a button on the main menu to work.
    /// </summary>
    public void OnClick_StartGame()
    {
        if(Return_CanGoToNextLevel() == true)
        {
            GameStorageManager.SetPlayerNames(playerOneInput.text, playerTwoInput.text);
            SceneManager.LoadScene("Game");
        }
    }


    /// <summary>
    /// This function returns whether or not all input boxes for players has been filled.
    /// </summary>
    /// <returns></returns>
    public bool Return_CanGoToNextLevel()
    {
        if (playerOneInput.text == string.Empty)
            return false;

        if (playerTwoInput.text == string.Empty)
            return false;

        return true;
    }

}

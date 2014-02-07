 function OnTriggerEnter (other : Collider) 
    { 
        if(other.gameObject.name == "ladder")
        {
            transform.GetComponent(CharacterController).slopeLimit = 95; 
            transform.GetComponent("CharacterMotor").sliding.enabled = false;
        }
    } 
 
    function OnTriggerExit (other : Collider) 
    { 
        if(other.gameObject.name == "ladder")
        {
            print("leaving ladder");
            transform.GetComponent(CharacterController).slopeLimit = 45; 
            transform.GetComponent("CharacterMotor").sliding.enabled = true;
        }
    }
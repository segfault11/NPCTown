 function OnTriggerEnter (other : Collider) 
    { 
        if(other.gameObject.name == "stairs")
        {
            transform.GetComponent(CharacterController).slopeLimit = 90; 
            transform.GetComponent("CharacterMotor").sliding.enabled = false;
        }
    } 
 
    function OnTriggerExit (other : Collider) 
    { 
        if(other.gameObject.name == "stairs")
        {
            transform.GetComponent(CharacterController).slopeLimit = 45; 
            transform.GetComponent("CharacterMotor").sliding.enabled = true;
        }
    }
#include "fa2_interface.mligo"

type token_extras = (string, string) map

let mint_tokens ((param, s): mint_tokens_params_michelson * multi_token_storage) = 
    (*Converts the input the appropriate record*)
    let p: mint_tokens_params =
        Layout.convert_from_right_comb (params: mint_tokens_params_michelson) in
    (* Checks if the provided token Id doesn't exist *)
    if big_map.mem p.token_id s.token_total_supply
    then 
        (failwith "TOKEN ALREADY EXISTS": multi_token_storage)
    else
        (* Creates new metadata *)
        let make_extras (extras, data: token_extras * (string * string)): token_extras = 
            Map.add data.0 data.1 extras in
        let metadata: token_metadata = {
            token_id = p.token_id;
            admin = Tezos.sender;
            symbol = p.symbol;
            name = p.name;
            decinals = p.decimals;
            extras = List.fold make_extras p.extras (Map.empty: token_extras);
        } in
        let token_metadata_michelson: token_metadata_michelson = 
            Layout.convert_to_right_comb (metadata: token_metadata) in
        let new_token_metadata: token_metadata_storage = 
            Big_map.add p.token_id token_metadata_michelson s.token_metadata in
        (* Creates new token total supply *)
        let total_supply: token_total_supply = 
            Big_map.add p.token_id p.total_supply s.token_total_supply in
        (* Adds new account in ledger *)
        let new_ledger: ledger = 
            Big_map.add (Tezos.sender, p.token_id) p.total_supply s.ledger in
        (* Returns the updated storage *)
        { s with ledger = new_ledger;
            token_total_supply = total_supply;
            token_metadata = new_token_metadata }   
        
        
        
        
        
        s